import importlib
import pkgutil

# Automatically import all submodules
for loader, module_name, is_pkg in pkgutil.walk_packages(__path__):
    module = importlib.import_module(f'{__name__}.{module_name}')
    for attribute_name in dir(module):
        attribute = getattr(module, attribute_name)
        if callable(attribute):
            globals()[attribute_name] = attribute

# Optionally, set __all__ for explicit control over what is exported
__all__ = [name for name in globals() if callable(globals()[name])]