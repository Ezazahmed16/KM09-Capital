import { BACKEND_BASE_URL } from "@/constants"
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest"
import { ListResponse } from "@/types"

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => {
      if (resource === "payments") {
        return "paymentList";
      }
      return resource;
    },
    buildQueryParams: async (params) => {
      const { pagination, filters, resource } = params;
      const query: Record<string, any> = {};

      if (pagination) {
        query.page = pagination.currentPage ?? 1;
        query.limit = pagination.pageSize ?? 10;
      }

      if (filters) {
        for (const filter of filters) {
          if ("field" in filter) {
            if (filter.field === "trxNo") {
              query.search = filter.value;
            } else if (filter.field === "paymentsMethods") {
              query.paymentMethod = filter.value;
            }
          }
        }
      }

      return query;
    },
    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();

      return payload.data ?? [];
    },
    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options)

export { dataProvider };