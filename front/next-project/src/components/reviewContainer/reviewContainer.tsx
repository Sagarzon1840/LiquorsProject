import { IReview } from "@/interfaces/interfaz";
import { Review } from "../review/review";

export const ReviewContainer = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};
