import { render } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';

const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      {ui}
    </AuthContext.Provider>,
    renderOptions
  );
};

export * from '@testing-library/react';
export { customRender as render };