import { ILead } from '#shared/types/ILead';

const storage = useStorage('uploads');

// Validate file size (5MB limit)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const allowedImagesTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

export default defineEventHandler(
  async (event) => {
    const items = await readMultipartFormData(event);

    if (!items) {
      throw createError({ statusCode: 400, statusMessage: 'No data received' });
    }

    for (const item of items) {
      // item.name contains the field name ('files', 'name', etc.)
      // item.filename contains the original file name if it is a file
      // item.data contains the Buffer (binary data)
      if (item.filename) {
        // Save item.data using fs or useStorage here
        if (item.data.length > MAX_FILE_SIZE) {
          throw createError({
            statusCode: 400,
            statusMessage: `File ${item.filename} exceeds maximum size of 5MB`,
          });
        }
        if (!item.type || !allowedImagesTypes.includes(item.type)) {
          throw createError({
            statusCode: 400,
            statusMessage: `File type ${item.type || 'unknown'} not allowed.
                Allowed types: ${allowedImagesTypes.join(', ')}`,
          });
        }
        // Store file using useStorage
        const fileName = `${Date.now()}-${item.filename}`;
        await storage.setItemRaw(`${fileName}`, item.data);
        console.log(
          `Received file: ${item.filename}, size: ${item.data.length} bytes`,
        );
      } else {
        console.log(`Field ${item.name}: ${item.data.toString()}`);
      }
    }

    return { success: true };
  },

  // async function saveImage(file:File):Proromise<void> {

  //       return "succes"
  // }
);
