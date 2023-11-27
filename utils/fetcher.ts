import axios from 'axios';
import { ContentTypeEnum } from '../enums/contentType';

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        ContentType: ContentTypeEnum.APPLICATION_JSON,
      },
    });

    return response.data;
  } catch (error: any) {
    return;
  }
};
