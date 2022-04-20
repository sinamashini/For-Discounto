import db, { StatusEnum } from "db";
import { z } from "zod";
import { UpdateClient } from "../../validation";
import { keys } from 'lodash';
import { updateParent } from "../deleteClient";

export const diffrenceDetctor = async (clientToUpdate: z.infer<typeof UpdateClient>, prisma) => {
  const currentClient = await prisma.clients.findUnique({
    where: { id: clientToUpdate.id }, include: {
      packageClients: {
        where: {
          status: "ACTIVE",
          clientId: clientToUpdate.id,
        }
      }
    }
  });

  let proccesedCurrentClient: any = currentClient;
  if (currentClient?.packageClients) {
    proccesedCurrentClient = { ...currentClient, packageId: currentClient?.packageClients[0]?.packageId }
  }

  const keysOfObject = keys(clientToUpdate.AddClient);
  let diffrences: any = {};
  if (proccesedCurrentClient) {
    keysOfObject.forEach(key => {
      if (clientToUpdate.AddClient[key] !== proccesedCurrentClient[key]) {
        diffrences = { ...diffrences, [key]: clientToUpdate.AddClient[key] }
      }
    });
  }

  return { ...clientToUpdate, diffrences, currentClient: proccesedCurrentClient };
}



export const updateLevels = async (input: Awaited<Promise<ReturnType<typeof diffrenceDetctor>>>, prisma) => {
  const { parentId } = input.diffrences;
  const { currentClient } = input;
  if (parentId && currentClient) {
    await updateChildren(input, prisma, currentClient.parentId);
    if (parentId !== null) {
      await prisma.clientsMap.create({ data: { parentId, childId: input.id, level: 1, status: "ACTIVE" } });
    }
    if (currentClient.parentId !== null) {
      await updateFirstLevelChild(input, prisma, currentClient);
    }
  }
  return input;
}

export const updateChildren = async (input: z.infer<typeof UpdateClient>, prisma, currentParentId?: number | null) => {
  const { parentId } = input.AddClient;
  if (parentId !== null) {
    const childeren = await prisma.clientsMap.findMany({ where: { parentId: input.id, status: { notIn: ["DEACTIVE", "USED_AND_DEACTIVE"] } } });

    await prisma.clientsMap.updateMany({
      where: {
        AND:
          [
            { parentId: { notIn: [...childeren.map(child => child.childId!), input.id!] } },
            { childId: { in: childeren.map(child => child.childId!) } },
            { status: "USED" }
          ]
      },
      data: { status: "USED_AND_DEACTIVE" }
    });

    await prisma.clientsMap.updateMany({
      where: {
        AND:
          [
            { parentId: { notIn: [...childeren.map(child => child.childId!), input.id!] } },
            { childId: { in: childeren.map(child => child.childId!) } },
            { status: { notIn: ["USED", "USED_AND_DEACTIVE"] } }
          ]
      },
      data: { status: "DEACTIVE" }
    });

    const childerenForNewParent = childeren.map(child => ({ level: child.level + 1, parentId, childId: child.childId, status: "ACTIVE" as StatusEnum }))

    const newParents = await prisma.clientsMap.findMany({ where: { childId: parentId } });

    const childrenWithParentLevel: any = [];
    childeren.forEach(child => {
      newParents.forEach(parent => {
        childrenWithParentLevel.push({ level: child.level + parent.level + 1, parentId: parent.parentId, childId: child.childId, status: "ACTIVE" as StatusEnum })
      })
    });

    await prisma.clientsMap.createMany({ data: childerenForNewParent });
    await prisma.clientsMap.createMany({ data: childrenWithParentLevel });
  }

}

const updateFirstLevelChild = async (input, currentClient, prisma) => {
  await prisma.clientsMap.updateMany({
    where: {
      AND: [
        { parentId: currentClient.parentId },
        { childId: input.id },
        { level: 1 },
        { status: "USED" }],
    },
    data: { status: "USED_AND_DEACTIVE" }
  });

  await prisma.clientsMap.updateMany({
    where: {
      AND: [
        { parentId: currentClient.parentId },
        { childId: input.id },
        { level: 1 },
        { status: { notIn: ["USED", "USED_AND_DEACTIVE"] } }
      ]
    },
    data: { status: "DEACTIVE" }
  });
}

export const updatePackage = async (input: Awaited<Promise<ReturnType<typeof diffrenceDetctor>>>, prisma) => {
  const { packageId } = input.diffrences;
  if (packageId) {
    await prisma.packagesClients.updateMany({ where: { status: "ACTIVE", clientId: input.id }, data: { status: "DEACTIVE" } });
    await prisma.packagesClients.create({ data: { clientId: input.id, packageId, status: "ACTIVE" } });
  }
  return input;
}
