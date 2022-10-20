import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { rest } from 'msw'
import { expect } from '@storybook/jest'
import { SignIn } from './Signin'

export default {
  title: 'Pages/SignIn',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(
            ctx.json({
              message: 'Login realizado!'
            })
          )
        })
      ]
    }
  }
} as Meta
export const Normal: StoryObj = {}
export const Filled: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.type(
      canvas.getByPlaceholderText('Digite seu e-mail'),
      'gabrielsuptitz@gmail.com'
    )

    userEvent.type(canvas.getByPlaceholderText('Digite sua senha'), '12312343')

    userEvent.click(canvas.getByRole('button'))

    await waitFor(() => {
      return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
    })
  }
}
