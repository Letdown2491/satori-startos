import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v0_2_0 } from './v0_2_0'
import { v0_3_0 } from './v0_3_0'
import { v0_3_1 } from './v0_3_1'
import { v0_4_0 } from './v0_4_0'
import { v0_4_1 } from './v0_4_1'
import { v0_4_2 } from './v0_4_2'
import { v0_5_0 } from './v0_5_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v0_2_0, v0_3_0, v0_3_1, v0_4_0, v0_4_1, v0_4_2, v0_5_0],
})
