import config from "config"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import authJwt from "./getUser"

describe("getUser middlewares tests", () => {
    test("success when all is valid", () => {
        const jwt = sign({}, config.get<string>('app.jwtSecret'))
        const request = {
            headers: {
                authorization: `Bearer ${jwt}`
            }
        } as Request
        const response = {} as Response
        const next = jest.fn((err) => { })

        authJwt(request, response, next)

        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toBeUndefined()
    })
})