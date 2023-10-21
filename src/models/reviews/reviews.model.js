import { reviews } from "./reviews.mongo.js";

const DEFAULT_REVIEW_ID = 0;

async function getLatestReviewId() {
  const latestReview = await reviews.findOne({}).sort("-reviewId");

  if (!latestReview) {
    return DEFAULT_REVIEW_ID;
  }

  return latestReview.reviewId;
}

async function getReviewById(reviewId) {
  return await reviews.findOne({ reviewId: reviewId }, { _id: 0, __v: 0 });
}

async function getReviewByUserId(gymId, userId) {
  return await reviews.findOne(
    { gymId: gymId, userId: userId },
    { _id: 0, __v: 0 }
  );
}

async function getReviewsByGymId(gymId) {
  return await reviews.find({ gymId: gymId }, { _id: 0, __v: 0 });
}

async function addReview(review, gymId) {
  const newReviewId = (await getLatestReviewId()) + 1;

  const newReview = {
    reviewId: newReviewId,
    gymId: Number(gymId),
    userId: Number(review.userId),
    rating: Number(review.rating),
    summary: review.summary,
    content: review.content,
    votes: [],
  };

  return await reviews
    .findOneAndUpdate({ userId: Number(review.userId) }, newReview, {
      upsert: true,
      new: true,
      returnOriginal: false,
    })
    .select({ _id: 0, __v: 0 });
}

async function voteReview(reviewId, vote) {
  const userId = Number(vote.userId);

  return await reviews
    .findOneAndUpdate(
      { reviewId: reviewId },
      [
        {
          $set: {
            votes: {
              $cond: {
                if: { $in: [userId, "$votes"] },
                then: {
                  $filter: {
                    input: "$votes",
                    as: "voteUserId",
                    cond: { $ne: ["$$voteUserId", userId] },
                  },
                },
                else: { $setUnion: ["$votes", [userId]] },
              },
            },
          },
        },
      ],
      { new: true, returnOriginal: false }
    )
    .select({ _id: 0, __v: 0 });
}

function averageRating(reviews) {
  if (reviews?.length > 0) {
    const totalRating = reviews.reduce((acc, cur) => {
      acc += cur.rating;
      return acc;
    }, 0);
    return totalRating / reviews.length;
  }

  return null;
}

export {
  getReviewById,
  addReview,
  voteReview,
  getReviewsByGymId,
  averageRating,
  getReviewByUserId,
};
