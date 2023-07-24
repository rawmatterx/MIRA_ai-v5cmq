import HttpError from '@wasp/core/HttpError.js'

export const getUserImages = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const images = await context.entities.Image.findMany({
    where: {
      userId
    }
  });

  return images;
}

export const getImageReport = async ({ imageId }, context) => {
  const report = await context.entities.Report.findUnique({
    where: { imageId }
  });

  if (!report) throw new HttpError(404, 'No report found for image with ID ' + imageId);

  return report;
}