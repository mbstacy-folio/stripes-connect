// Provides a wrapper for crudActions that inserts `dataKey` into the
// `meta` object of each action that is created.

function CrudActionsAugmenter(dataKey, crudActions) {
  return new Proxy(this, {
    get: (receiver, name) => receiver.augmentWithDataKey.bind(receiver, crudActions, name, dataKey),
  });
}

CrudActionsAugmenter.prototype.augmentWithDataKey = (crudActions, name, dataKey, arg1, arg2, arg3) => {
  if (!crudActions[name]) console.log(`CrudActionsAugmenter: no such function '${name}' in`, crudActions);
  const x = crudActions[name](arg1, arg2, arg3);
  return Object.assign({}, x, { dataKey });
};

export default CrudActionsAugmenter;
