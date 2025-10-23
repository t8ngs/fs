/*
 * @t8ngs/fs
 *
 * (c) T8ngs
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@t8ngs/runner/core' {
  interface TestContext {
    fs: FileSystem
  }
}

import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createId } from '@paralleldrive/cuid2'
import type { PluginFn } from '@t8ngs/runner/types'
import { TestContext, Test } from '@t8ngs/runner/core'

import './src/assert.js'
import { FileSystem } from './src/file_system.js'

/**
 * The filesystem plugin for T8ngs
 */
export function fileSystem(options?: { basePath?: string | URL; autoClean?: boolean }) {
  const normalizeOptions = Object.assign(
    { basePath: join(tmpdir(), createId()), autoClean: true },
    options
  )

  /**
   * Create the base root path for the file system class
   */
  const baseRoot =
    typeof normalizeOptions.basePath === 'string'
      ? normalizeOptions.basePath
      : fileURLToPath(normalizeOptions.basePath)

  const fsPlugin: PluginFn = function () {
    TestContext.getter('fs', () => new FileSystem(baseRoot), true)

    Test.executing((test) => {
      /**
       * Share fs property with assert module
       */
      test.context.assert.fs = test.context.fs

      if (normalizeOptions.autoClean) {
        test.context.cleanup(() => test.context.fs.cleanup())
      }
    })
  }

  return fsPlugin
}

export { FileSystem } from './src/file_system.js'
