export interface IToy {
  id: number | null;
  toyName: string;
  toyType: string;
  description: string;
  ageMinimum: number;
  imageURL: string;
  additionalImageURLs: string[] | null;
}
