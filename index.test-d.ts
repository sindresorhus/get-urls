import { expectType } from 'tsd-check';
import getUrls from '.';
import * as fs from 'fs';

expectType<Set<string>>(getUrls(fs.readFileSync('fixture.txt', 'utf8')));
