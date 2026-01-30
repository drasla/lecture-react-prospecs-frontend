import type { CreateReviewParams, MyReview } from "../types/review.ts";
import { httpClient } from "./axios.ts";

export const createReview = async (data: CreateReviewParams) => {
    const response = await httpClient.post("/reviews", data);
    return response.data;
};

export const getMyReviews = async () => {
    const response = await httpClient.get<MyReview[]>("/reviews/me");
    return response.data;
};

export const deleteReviews = async (reviewId: number) => {
    const response = await httpClient.delete(`/reviews/${reviewId}`);
    return response.data;
};
