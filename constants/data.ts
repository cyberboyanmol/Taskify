import { ListWithCards } from "@/types";

interface Board {
  id: string;
  orgId: string;
  title: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: string;
  title: string;
  order: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  cards: Card[];
  board: Board;
}

interface Card {
  id: string;
  title: string;
  // Add other properties as needed
}
export const BoardData: List[] = [
  {
    id: "1c46f297-3ce6-4300-826f-0c7508944afa",
    title: "Testing 1",
    order: 0,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-13T19:12:04.830Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "e6259852-fb55-4228-ac6a-9bd5c32584f3",
    title: "Testing 2",
    order: 1,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-13T19:12:14.139Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "d282a981-8c8a-48e3-966f-cc5eb9590519",
    title: "ghjghjghj",
    order: 2,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-14T11:49:06.351Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [
      {
        id: "5766b25d-5beb-4b33-8086-1625b79b62e7",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 1,
        description:
          '<blockquote>Okay</blockquote><p><span class="ql-cursor">﻿</span></p>',
        parentCardId: null,
        listId: "d282a981-8c8a-48e3-966f-cc5eb9590519",
        createdAt: "2024-02-13T19:07:58.862Z",
        updatedAt: "2024-02-15T12:50:41.926Z",
      },
    ],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "1c4f7670-6f81-41df-a962-e4836ce94253",
    title: "Pending",
    order: 3,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-13T19:06:33.725Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
    title: "ghjghjghj",
    order: 4,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-14T11:49:11.968Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [
      {
        id: "6ff2caea-c867-4b23-84ea-108b9523711b",
        title:
          "Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well! Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.",
        order: 0,
        description: "<p>khkhkhkjhkhkhkhkhk</p>",
        parentCardId: null,
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-13T19:30:17.434Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
      {
        id: "0067c59f-b036-4c25-9d28-c316d7a96210",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 1,
        description: null,
        parentCardId: null,
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-13T19:19:38.279Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
      {
        id: "6b977147-e8fa-4839-95a6-827cfdad1bda",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 2,
        description: null,
        parentCardId: null,
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-13T19:19:57.773Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
      {
        id: "66e9a840-3667-46b4-9116-d81b493dd700",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 3,
        description: null,
        parentCardId: "6b977147-e8fa-4839-95a6-827cfdad1bda",
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-14T11:49:23.569Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
      {
        id: "67032747-4efe-46ea-8432-6cc290ea36d1",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 4,
        description: null,
        parentCardId: null,
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-13T19:19:47.754Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
      {
        id: "6fb36eb7-fd4e-412d-bdb6-d51f8c21188a",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 5,
        description: null,
        parentCardId: null,
        listId: "0272b49a-b42c-447d-938a-fbc56a9bcbec",
        createdAt: "2024-02-13T19:19:44.973Z",
        updatedAt: "2024-02-15T13:17:13.717Z",
      },
    ],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "f57622f9-04e1-408d-86ac-117c0faca53d",
    title: "ghjghj",
    order: 5,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-14T11:49:20.438Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [
      {
        id: "d48fbe64-633c-4745-905a-fcd5d46905b1",
        title: "Create a ",
        order: 0,
        description: null,
        parentCardId: null,
        listId: "f57622f9-04e1-408d-86ac-117c0faca53d",
        createdAt: "2024-02-13T19:19:50.654Z",
        updatedAt: "2024-02-15T13:21:04.648Z",
      },
      {
        id: "0c3c2ad7-a20e-4542-a912-73943efa931f",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 1,
        description: null,
        parentCardId: null,
        listId: "f57622f9-04e1-408d-86ac-117c0faca53d",
        createdAt: "2024-02-13T19:19:54.679Z",
        updatedAt: "2024-02-15T13:21:04.648Z",
      },
      {
        id: "760e6d74-824c-49a6-a847-f42b0dcb3a9f",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 2,
        description: null,
        parentCardId: null,
        listId: "f57622f9-04e1-408d-86ac-117c0faca53d",
        createdAt: "2024-02-13T19:19:42.273Z",
        updatedAt: "2024-02-15T13:21:04.648Z",
      },
    ],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "9223284f-f6e8-4760-b934-ad0390dc302a",
    title: "Testing 1 - Copy",
    order: 6,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-14T11:49:23.569Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [
      {
        id: "632c319c-ecd9-40d9-aeb6-13d460ce8e6f",
        title:
          "Create a sidebar during the individual board at desktop view  only",
        order: 1,
        description: null,
        parentCardId: "67032747-4efe-46ea-8432-6cc290ea36d1",
        listId: "9223284f-f6e8-4760-b934-ad0390dc302a",
        createdAt: "2024-02-14T11:49:23.569Z",
        updatedAt: "2024-02-14T11:49:23.569Z",
      },
    ],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
  {
    id: "44e5e6f1-60f4-4622-8679-dd02c1b95d18",
    title: "dfgdfg",
    order: 7,
    boardId: "b610222a-269a-4e5c-8600-5821223e2120",
    createdAt: "2024-02-14T14:39:46.979Z",
    updatedAt: "2024-02-15T12:47:11.697Z",
    cards: [],
    board: {
      id: "b610222a-269a-4e5c-8600-5821223e2120",
      orgId: "org_2aibuJd4HCFp9fLBzzSjreUhRdW",
      title: "Engineering",
      imageId: "zuueig1w8WI",
      imageThumbUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=80&w=200",
      imageFullUrl:
        "https://images.unsplash.com/photo-1553796661-17b7fa359f49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NjQ5MDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4NjcxOTh8&ixlib=rb-4.0.3&q=85",
      imageUserName: "Mike Yukhtenko",
      imageLinkHTML: "https://unsplash.com/photos/sand-dune-zuueig1w8WI",
      createdAt: "2024-02-13T19:05:36.857Z",
      updatedAt: "2024-02-13T23:33:32.330Z",
    },
  },
];
