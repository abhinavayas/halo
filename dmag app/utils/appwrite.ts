import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Permission,
  Query,
  QueryTypesList,
  Role,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "dmag.com",
  projectId: "667e7ee7002bf6754be0",
  storageId: "667f9858003070cadaf3", // Change
  databaseId: "667e89010018c99403ae",
  userCollectionId: "667e892a00311aedc132",
  postCollectionId: "667f8b4f001b13a4893c", // Remove
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const userId = ID.unique();

    const newAccount = await account.create(userId, email, password, username);
    console.log(newAccount);
    if (!newAccount) throw Error;

    await signIn(email, password);

    const docID = ID.unique();
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      docID,
      {
        id: docID,
        accountId: newAccount.$id,
        email: email,
        username: username,
      },
      [
        Permission.read(Role.any()), // Anyone can view this document
        Permission.update(Role.user(newAccount.$id)), // Writers can update this document
        Permission.delete(Role.user(newAccount.$id)), // User 5c1f88b42259e can delete this document
      ]
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        512,
        512
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(
  file: { [x: string]: any; mimeType: any },
  type: any
) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createVideoPost(form: {
  userId: any;
  caption: any;
  image: any;
}) {
  try {
    const [imageUrl] = await Promise.all([uploadFile(form.image, "image")]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        caption: form.caption,
        image: imageUrl,
        creator: form.userId, // this is not account id but document id
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId: string | number) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getuser(user_id: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user_id
    );

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
