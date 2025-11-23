import { useQuery } from '@tanstack/react-query'
import {
  getSummaryStats,
  getActivityChart,
  getDecisionsChart,
  getCategoriesChart,
} from '../stats'
import type { StatsParams } from '../../types'

export const useSummaryStats = (params: StatsParams = {}) => {
  return useQuery({
    queryKey: ['stats', 'summary', params],
    queryFn: () => getSummaryStats(params),
  })
}

export const useActivityChart = (params: StatsParams = {}) => {
  return useQuery({
    queryKey: ['stats', 'activity', params],
    queryFn: () => getActivityChart(params),
  })
}

export const useDecisionsChart = (params: StatsParams = {}) => {
  return useQuery({
    queryKey: ['stats', 'decisions', params],
    queryFn: () => getDecisionsChart(params),
  })
}

export const useCategoriesChart = (params: StatsParams = {}) => {
  return useQuery({
    queryKey: ['stats', 'categories', params],
    queryFn: () => getCategoriesChart(params),
  })
}
