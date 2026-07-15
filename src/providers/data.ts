import { DataProvider, BaseRecord, GetListParams, GetListResponse } from '@refinedev/core';
import {MOCK_PAYMENTS} from "@/constants/mock-data.ts";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== 'payments') {
      return { data: [] as TData[], total: 0 };
    }

    return {
      data: MOCK_PAYMENTS as unknown as TData[],
      total: MOCK_PAYMENTS.length,
    };
  },

  getOne: async () => {
    throw new Error("This function is not present.");
  },
  create: async () => {
    throw new Error("This function is not present.");
  },
  update: async () => {
    throw new Error("This function is not present.");
  },
  deleteOne: async () => {
    throw new Error("This function is not present.");
  },

  getApiUrl: () => '',
};