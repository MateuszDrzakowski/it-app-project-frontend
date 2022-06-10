export interface IComment {
  id: number | null,
  authorId: number,
  targetUserId: number,
  content: string,
  create_date: string,
  rating: number,
}
