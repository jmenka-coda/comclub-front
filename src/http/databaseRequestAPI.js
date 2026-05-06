import { $authHost } from "./index";

export const fetchVisitorsByAdmin = async (adminId) => {
    const { data } = await $authHost.get(`database-requests/visitors/${adminId}`);
    return data;
};

export const fetchVisitorsThreeHours = async () => {
    const { data } = await $authHost.get('database-requests/visitors-three-h');
    return data;
};

export const fetchVisitorsEvening = async () => {
    const { data } = await $authHost.get('database-requests/visitors-evening');
    return data;
};

export const fetchAverageNumbers = async () => {
    const { data } = await $authHost.get('database-requests/info-averege-numbers');
    return data;
};

export const fetchDiagramData = async (period) => {
    const { data } = await $authHost.get(`database-requests/diagram/${period}`);
    return data;
};

export const fetchBestAdmins = async () => {
    const { data } = await $authHost.get('database-requests/best-admins');
    return data;
};

const saveBlob = (blob, fallbackName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fallbackName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const downloadPlannedRentalReceipt = async (rentalId) => {
    const response = await $authHost.get(`database-requests/reports/planned-rental-receipt/${rentalId}`, {
        responseType: 'blob',
    });
    saveBlob(response.data, `planned-rental-receipt-${rentalId}.docx`);
};

export const downloadComputersUsageReport = async (from, to) => {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;

    const response = await $authHost.get('database-requests/reports/computer-usage', {
        responseType: 'blob',
        params,
    });
    saveBlob(response.data, 'computers-usage-report.xlsx');
};
