import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAds, getAdById, approveAd, rejectAd, requestChanges } from '../ads'
import type {
  GetAdsParams,
  RejectAdParams,
  RequestChangesParams,
} from '../../types'

export const useAds = (params: GetAdsParams = {}) => {
  return useQuery({
    queryKey: ['ads', params],
    queryFn: () => getAds(params),
  })
}

export const useAd = (id: number) => {
  return useQuery({
    queryKey: ['ad', id],
    queryFn: () => getAdById(id),
    enabled: !!id, //запрос выполнится если id есть
  })
}

export const useApproveAd = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => approveAd(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] })
      queryClient.invalidateQueries({ queryKey: ['ad', id] })
    },
  })
}

export const useRejectAd = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RejectAdParams) => rejectAd(id, params),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] })
      queryClient.invalidateQueries({ queryKey: ['ad', id] })
    },
  })
}

export const useRequestChanges = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: RequestChangesParams) => requestChanges(id, params),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] })
      queryClient.invalidateQueries({ queryKey: ['ad', id] })
    },
  })
}
