import { afterEach, describe, expect, it, vi } from 'vitest'

import * as logger from './logger'

const mockLog = vi.fn()

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe.each([
    { level: 'success' },
    { level: 'info' },
    { level: 'log' },
    { level: 'warn' },
    { level: 'error' },
  ])('${level}()', ({ level }) => {
    it(`logs message "${level}"`, () => {
      const spy = vi.spyOn(logger, level as any)
      spy.mockImplementation(mockLog)
      const loggerFn = (logger as any)[level]
      loggerFn(level)
      expect(spy).toHaveBeenCalledWith(level)
    })
  })
})
