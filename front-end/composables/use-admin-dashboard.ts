import { ref } from "vue";
import { useApiClient } from "~/composables/use-api-client";

export const useAdminDashboard = () => {
  const data = ref<any | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { authFetch } = useApiClient();

  const fetch = async (opts?: { timeframe?: string }) => {
    loading.value = true;
    error.value = null;
    console.debug("useAdminDashboard: fetch called", opts);
    try {
      const qs = opts?.timeframe ? `?timeframe=${encodeURIComponent(opts.timeframe)}` : "";
      const res = await authFetch(`/api/admin/dashboard${qs}`);
      console.debug("useAdminDashboard: fetch response", res);
      data.value = res;
    } catch (e: any) {
      console.error("useAdminDashboard fetch error:", e);
      error.value = e?.message ?? String(e ?? "Unknown error");
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  const refresh = () => fetch();

  return {
    data,
    loading,
    error,
    fetch,
    refresh,
  } as const;
};

export default useAdminDashboard;
