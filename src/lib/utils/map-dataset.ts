type MapDatasetInput = {
  initialData: Array<Record<string, unknown>>;
  setLabel: string;
};

export function mapDataset(input: MapDatasetInput) {
  const { initialData, setLabel } = input;
  const uniqueKeys: Set<string> = new Set([]);
  initialData.forEach((datapoint) => {
    Object.keys(datapoint)
      .filter((key) => !uniqueKeys.has(key))
      .forEach((uniqueKey) => {
        uniqueKeys.add(uniqueKey);
      });
  });
  const outputObject: Record<string, unknown> = {};
  uniqueKeys.forEach((key) => {
    outputObject[key] = initialData.map((datapoint) => datapoint[key]);
  });
  const labels: Array<string> = outputObject.label as Array<string>;
  outputObject.label = setLabel;
  return { labels, outputObject };
}
