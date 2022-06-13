export interface ISwapRequest {
  id: number | null,
  requestorUserId: number,
  targetUserId: number,
  inExchangeOfferId: number | null,
  inExchangeToyName: string | null,
  targetOfferId: number,
  targetToyName: string;
  acceptedByRequestor: boolean,
  acceptedByTargetUser: boolean,
  offerType: string,
  finalizedRequestor: boolean,
  finalizedTarget: boolean,
  visible: true,
  avatar: string | null
}
