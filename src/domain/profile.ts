import { ProfileDetails, ProfileInfo } from "@/domain/xtream";

export const APP_VERSION = '1.1.11'

export const EMPTY_PROFILE_DETAIL = '-'

export const EMPTY_PROFILE_DETAILS: ProfileDetails = {
    moviesCount: 0,
    seriesCount: 0,
    liveCount: 0,
    listName: EMPTY_PROFILE_DETAIL,
    username: EMPTY_PROFILE_DETAIL,
    serverUrl: EMPTY_PROFILE_DETAIL,
    timeZone: EMPTY_PROFILE_DETAIL,
    daysLeft: EMPTY_PROFILE_DETAIL,
    startDate: EMPTY_PROFILE_DETAIL,
    endDate: EMPTY_PROFILE_DETAIL,
    maxConnections: EMPTY_PROFILE_DETAIL,
    appVersion: APP_VERSION,
    status: EMPTY_PROFILE_DETAIL,
}

export const mapProfileInfoToProfileDetails = (
    listName: string,
    moviesCount: number,
    seriesCount: number,
    liveCount: number,
    info?: ProfileInfo
): ProfileDetails => {
    const { startDate, endDate, daysLeft } = getSubscriptionInfo(info);

    return {
        moviesCount,
        seriesCount,
        liveCount,
        listName,
        username: info?.user_info?.username ?? EMPTY_PROFILE_DETAIL,
        serverUrl: info ? `${info?.server_info?.server_protocol}://${info?.server_info?.url}` : EMPTY_PROFILE_DETAIL,
        timeZone: info?.server_info?.timezone ?? EMPTY_PROFILE_DETAIL,
        daysLeft,
        startDate,
        endDate,
        maxConnections: info?.user_info?.max_connections ?? EMPTY_PROFILE_DETAIL,
        appVersion: APP_VERSION,
        status: info?.user_info?.status ?? EMPTY_PROFILE_DETAIL,
    }
}

export const getSubscriptionInfo = (info?: ProfileInfo) => {
    if(!info) return {startDate: EMPTY_PROFILE_DETAIL, endDate: EMPTY_PROFILE_DETAIL, daysLeft: EMPTY_PROFILE_DETAIL};

    // Convertir timestamps de segundos a milisegundos
    const createdAt = new Date(parseInt(info.user_info.created_at, 10) * 1000);
    const expDate = new Date(parseInt(info.user_info.exp_date, 10) * 1000);
    const now = new Date(info.server_info.timestamp_now * 1000);
  
    // Calcular días restantes
    const msPerDay = 1000 * 60 * 60 * 24
    const daysLeft = Math.max(
      0,
      Math.ceil((expDate.getTime() - now.getTime()) / msPerDay),
    ).toString()

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }

    const startDate = createdAt.toLocaleDateString('es-ES', options)
    const endDate = expDate.toLocaleDateString('es-ES', options)

    return { startDate, endDate, daysLeft }
  }