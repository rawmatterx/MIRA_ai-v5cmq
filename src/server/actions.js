import HttpError from '@wasp/core/HttpError.js'

export const uploadImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { userId, url, report } = args;

  return context.entities.Image.create({
    data: {
      userId,
      url,
      report
    }
  });
}

export const createReport = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { userId, imageId, text } = args;

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });
  if (!user) { throw new HttpError(404, 'User not found') };

  const image = await context.entities.Image.findUnique({
    where: { id: imageId }
  });
  if (!image) { throw new HttpError(404, 'Image not found') };

  return context.entities.Report.create({
    data: {
      userId,
      imageId,
      text
    }
  });
}