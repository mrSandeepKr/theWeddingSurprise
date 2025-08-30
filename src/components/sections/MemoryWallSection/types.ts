export interface MessageStruct {
  id: number;
  name: string;
  message: string;
  thumbnailPic?: string;
  images: string[];
  date: string;
}

export interface CSVRow {
  "Timestamp": string;
  "Name to Show (Please be nice XD)": string;
  "Message": string;
  "Pictures (Optional)": string;
  "Display Picture (Optional)": string;
  "Approved": string;
}