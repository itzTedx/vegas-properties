// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Agents } from "./collections/agents";
import { Bookmarks } from "./collections/Bookmarks";
import { Developers } from "./collections/Developers";
import { GuestSessions } from "./collections/GuestSessions";
import { Media } from "./collections/Media";
import { Property } from "./collections/Property";
import { ServiceAreas } from "./collections/ServiceAreas";
import { Specialties } from "./collections/Specialties";
import { Users } from "./collections/Users";
import { env } from "./lib/env/server";
import { plugins } from "./lib/payload/plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Property, Agents, Media, Developers, Users, GuestSessions, Bookmarks, Specialties, ServiceAreas],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [...plugins],
});
