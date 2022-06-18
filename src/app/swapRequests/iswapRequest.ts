export interface ISwapRequest {
  id: number | null,
  requesterUserId: number,
  targetUserId: number,
  inExchangeOfferId: number | null,
  targetOfferId: number,
  acceptedByTargetUser: boolean | null,
  targetToyName: string,
  inExchangeToyName: string,
}
