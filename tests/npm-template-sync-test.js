import test from 'ava';
import { npmTemplateSync, createFiles } from '../src/npm-template-sync';
import { GithubProvider } from 'github-repository-provider';

const ora = require('ora');

const REPOSITORY_NAME = 'arlac77/sync-test-repository';
const TEMPLATE_REPO = 'Kronos-Tools/npm-package-template';

test('npmTemplateSync files', async t => {
  const provider = new GithubProvider(process.env.GH_TOKEN);
  const repo = await provider.repository(TEMPLATE_REPO);
  const branch = await repo.branch('master');

  const files = await createFiles(branch);

  //console.log(files.map(f => `${f.constructor.name}:${f.path}`));

  t.is(files.find(f => f.path === 'package.json').path, 'package.json');
  t.is(files.find(f => f.path === 'package.json').constructor.name, 'Package');
});

test('npmTemplateSync', async t => {
  const spinner = ora('args');

  const pullRequest = await npmTemplateSync(
    spinner,
    console,
    process.env.GH_TOKEN,
    REPOSITORY_NAME,
    TEMPLATE_REPO
  );

  //console.log(pullRequest.name);
  t.truthy(pullRequest.name);

  //await pullRequest.delete();

  //t.pass('worker done');
});
