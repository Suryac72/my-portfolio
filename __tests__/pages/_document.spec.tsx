jest.mock('next/document', () => ({
  Html: ({ children }: any) => <div>{children}</div>,
  Head: ({ children }: any) => <div>{children}</div>,
  Main: () => <div />,
  NextScript: () => <div />,
}));

import Document from '@/pages/_document';

describe('_document', () => {
  it('executes without crashing', () => {
    Document();
  });
});
