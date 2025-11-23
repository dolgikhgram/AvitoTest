import client from './client'
import type {
  StatsSummary,
  ActivityData,
  DecisionsData,
  CategoriesChart,
  StatsParams,
} from '../types'

export const getSummaryStats = (
  params: StatsParams = {}
): Promise<StatsSummary> => {
  return client.get('/stats/summary', { params }).then(response => {
    return response.data?.data || response.data
  })
}

export const getActivityChart = (
  params: StatsParams = {}
): Promise<ActivityData[]> => {
  return client.get('/stats/chart/activity', { params }).then(response => {
    return response.data?.data || response.data
  })
}

export const getDecisionsChart = (
  params: StatsParams = {}
): Promise<DecisionsData> => {
  return client.get('/stats/chart/decisions', { params }).then(response => {
    return response.data?.data || response.data
  })
}

export const getCategoriesChart = (
  params: StatsParams = {}
): Promise<CategoriesChart> => {
  return client.get('/stats/chart/categories', { params }).then(response => {
    return response.data?.data || response.data
  })
}
