export class CreateGoalDto {
  title: string;
  description?: string;
  isDone?: boolean;
  days?: string[];
}
