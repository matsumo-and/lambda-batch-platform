import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_events as events,
  aws_events_targets as targets,
  Duration,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class SampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunc = new lambda.DockerImageFunction(this, "SampleFunction", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.resolve(__dirname, "../../lambda/sample-project"),
      ),
      memorySize: 256,
      timeout: Duration.seconds(10),
    });

    new events.Rule(this, "SampleFunctionRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "0" }), // 毎日0時
      targets: [new targets.LambdaFunction(lambdaFunc)],
    });
  }
}
