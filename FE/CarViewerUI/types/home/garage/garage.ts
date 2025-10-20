export interface Garage {
  id: string;
  name: string;
  carCount: number;
  imageUrl: string;
  ownerId: string;
  isShared?: boolean;
}
