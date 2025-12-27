// components/__tests__/Input.spec.tsx
 
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/Input';

describe('Input Component', () => {
  const mockRegister = jest.fn();

  it('renders a text input', () => {
    // Render the input
    render(
      <Input 
        label="Name" 
        inputType="text" 
        inputName="name" 
        register={mockRegister} 
        errors={{}} 
      />
    );
    
    // Check that the label text exists
    expect(screen.getByText('Name')).toBeInTheDocument();
    
    // Since label association is missing in the component, we find the input by role.
    // 'textbox' role applies to input[type="text"] and textarea.
    const input = screen.getByRole('textbox');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('rows');
  });

  it('renders a textarea', () => {
    render(
      <Input 
        label="Message" 
        inputType="text" 
        inputName="msg" 
        isTextArea={true}
        register={mockRegister} 
        errors={{}} 
      />
    );
    
    // Textarea also has role 'textbox'
    const textarea = screen.getByRole('textbox');
    
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('displays error message', () => {
    render(
      <Input 
        label="Email" 
        inputType="email" 
        inputName="email" 
        register={mockRegister} 
        errors={{ email: { type: 'required', message: 'Required' } }} 
      />
    );
    // The component renders "${label} is required." when an error exists
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });
});