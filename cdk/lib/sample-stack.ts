import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_events as events,
  aws_events_targets as targets,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";

export class BatchAStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, "BatchAFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.resolve(__dirname, "../../batches/batch-a/dist"),
      ),
    });

    new events.Rule(this, "ScheduleRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "0" }), // 毎日0時
      targets: [new targets.LambdaFunction(fn)],
    });
  }
}
