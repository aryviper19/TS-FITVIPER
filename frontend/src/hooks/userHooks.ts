import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo'

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })
  export const useSignupMutation = () =>
    useMutation({
      mutationFn: async ({
        firstName,
        lastName,





        email,
        password,
      }: {
        firstName: string
        lastName: string




        
        email: string
        password: string
      }) =>
        (
          await apiClient.post<UserInfo>(`api/users/signup`, {
            firstName,
            lastName,






            email,
            password,
          })
        ).data,
    })