export default defineEventHandler(async (event) => {
  console.log('substitution');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  throw createError({ statusCode: 400, message: 'No data received' });
  return { success: true };
});
