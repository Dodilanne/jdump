export function dumpWrite(file: string) {}

export function dumpRead(file: string) {}

export function dumpClear(file: string) {}

export function createDump(file: string) {
  const dump = () => dumpWrite(file);
  dump.write = () => dumpWrite(file);
  dump.read = () => dumpRead(file);
  dump.clear = () => dumpClear(file);
  return dump;
}

export function getDefaultFile() {
  return "";
}

export const dump = createDump(getDefaultFile());
