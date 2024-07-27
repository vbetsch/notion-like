import '@testing-library/jest-dom';
import '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
