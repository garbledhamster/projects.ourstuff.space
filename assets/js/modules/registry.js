(function () {
  "use strict";

  /** @type {Array<Record<string, any>>} */
  const moduleDefinitions = [];
  /** @type {Map<string, Record<string, any>>} */
  const moduleById = new Map();

  const normalizeDefinition = (module) => {
    if (!module || typeof module !== "object") return null;
    const id = String(module.id || "").trim().toLowerCase();
    if (!id) return null;

    return {
      id,
      icon: String(module.icon || "").trim().slice(0, 4) || "🧩",
      name: String(module.name || "").trim().slice(0, 80),
      desc: String(module.desc || "").trim().slice(0, 260),
      visibleData: String(module.visibleData || "").trim().slice(0, 260),
      controlledActions: String(module.controlledActions || "").trim().slice(0, 260),
      primary: Boolean(module.primary),
      settingsSchema: module.settingsSchema || null,
      defaultSettings: module.defaultSettings || null,
      renderSettings: typeof module.renderSettings === "function" ? module.renderSettings : null,
      renderPanel: typeof module.renderPanel === "function" ? module.renderPanel : null,
      settingsRenderer: module.settingsRenderer || null,
      panelRenderer: module.panelRenderer || null
    };
  };

  const registerModule = (definition) => {
    const normalized = normalizeDefinition(definition);
    if (!normalized) return false;
    if (moduleById.has(normalized.id)) return false;
    moduleDefinitions.push(normalized);
    moduleById.set(normalized.id, normalized);
    return true;
  };

  const getBuiltInModuleDefinitions = () => moduleDefinitions.slice();
  const getBuiltInModuleDefinition = (id) => moduleById.get(String(id || "").toLowerCase()) || null;
  const hasBuiltInModule = (id) => moduleById.has(String(id || "").toLowerCase());

  window.registerBuiltInModule = registerModule;
  window.getBuiltInModuleDefinitions = getBuiltInModuleDefinitions;
  window.getBuiltInModuleDefinition = getBuiltInModuleDefinition;
  window.hasBuiltInModule = hasBuiltInModule;

  const moduleRegistryReady = fetch("assets/modules/builtins.json")
    .then((r) => r.ok ? r.json() : Promise.reject(new Error("Failed to load built‑in modules")))
    .then((list) => {
      if (Array.isArray(list)) {
        list.forEach((def) => {
          if (def && typeof def.id === "string") {
            registerBuiltInModule(def);
          }
        });
      }
      return getBuiltInModuleDefinitions();
    })
    .catch((e) => {
      console.error("Error loading built-in modules:", e);
      return [];
    });

  window.moduleRegistryReady = moduleRegistryReady;
})();
