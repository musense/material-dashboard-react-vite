import { instance } from "./saga/AxiosInstance";
import dayjs from 'dayjs';

export function GetDefaultBannerList(signal) {
    const startDate = new Date(`${dayjs().subtract(3, 'month').format('YYYY-MM-DD')} 00:00:00`).getTime()
    const endDate = new Date(`${dayjs().format('YYYY-MM-DD')} 23:59:59`).getTime()
    const startDateString = `startDate=${startDate}`
    const endDateString = `endDate=${new Date(endDate).getTime()}`

    // return instance.get(`/banner/dashboard?pageNumber=1&limit=10&${startDateString}&${endDateString}`, { signal });
    return instance.get(`/banner/dashboard?pageNumber=1&limit=10`, { signal });

}