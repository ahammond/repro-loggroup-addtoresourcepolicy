import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AnyPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const r = new LogGroup(this, 'MyLogGroup', {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // This fails, no matter what the policy.
    r.addToResourcePolicy(new PolicyStatement({
      actions: ['logs:CreateLogGroupLogStream', 'logs:DescribeLogStreams', 'logs:PutLogEvents'],
      principals: [new AnyPrincipal()],
      resources: ['*'],
    }));
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
new MyStack(app, 'MyStack',  { env: devEnv });

app.synth();
