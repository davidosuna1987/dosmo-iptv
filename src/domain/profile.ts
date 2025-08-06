import { ProfileDetails, ProfileInfo } from "@/domain/xtream";

export const mapProfileInfoToProfileDetails = (
    listName: string,
    moviesCount: number,
    seriesCount: number,
    liveCount: number,
    info: ProfileInfo
): ProfileDetails => {
    const { startDate, endDate, daysLeft } = getSubscriptionInfo(info);

    return {
        moviesCount,
        seriesCount,
        liveCount,
        listName,
        username: info.user_info.username,
        serverUrl: `${info.server_info.server_protocol}://${info.server_info.url}`,
        timeZone: info.server_info.timezone,
        daysLeft,
        startDate,
        endDate,
        maxConnections: info.user_info.max_connections,
        appVersion: '1.1.11',
        status: info.user_info.status,
    }
}

export const EMPTY_PROFILE_DETAILS: ProfileDetails = {
    moviesCount: 0,
    seriesCount: 0,
    liveCount: 0,
    listName: '-',
    username: '-',
    serverUrl: '-',
    timeZone: '-',
    daysLeft: '-',
    startDate: '-',
    endDate: '-',
    maxConnections: '-',
    appVersion: '1.1.11',
    status: '-',
}

export const getSubscriptionInfo = (info: ProfileInfo) => {
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