import type { CreateReviewParams } from "../types/review.ts";
import { httpClient } from "./axios.ts";

export const createReview = async (data: CreateReviewParams) => {
    const response = await httpClient.post("/reviews", data);
    return response.data;
}