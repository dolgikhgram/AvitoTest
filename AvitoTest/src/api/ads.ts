import client from './client'
import type {
  AdsResponse,
  GetAdsParams,
  Advertisement,
  RejectAdParams,
  RequestChangesParams,
} from '../types'

export const getAds = (params: GetAdsParams = {}): Promise<AdsResponse> => {
  return client.get('/ads', { params }).then((response) => response.data)
}

export const getAdById = (id: number): Promise<Advertisement> => {
  return client.get(`/ads/${id}`).then((response) => response.data)
}

export const approveAd = (
  id: number
): Promise<{ message: string; ad: Advertisement }> => {
  return client.post(`/ads/${id}/approve`)
}

export const rejectAd = (
  id: number,
  params: RejectAdParams
): Promise<{ message: string; ad: Advertisement }> => {
  return client.post(`/ads/${id}/reject`, params)
}

export const requestChanges = (
  id: number,
  params: RequestChangesParams
): Promise<{ message: string; ad: Advertisement }> => {
  return client.post(`/ads/${id}/request-changes`, params)
}
