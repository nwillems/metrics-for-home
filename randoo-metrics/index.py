
import random
import time
import http.client

PUSHGATEWAY_HOST="localhost"
PUSHGATEWAY_PORT=9091

def send_metrics(job_name, metrics, labels):
    """
    Will send metrics to the following enpoint:
        Path /metrics/job/<JOB_NAME>{/<LABEL_NAME>/<LABEL_VALUE>}*
    And send the metrics as follows:
        metric_name metric_value

    The assumption then is that, labels and metrics are dictionaries.
    """
    metrics_path = "/metrics/job/{}".format(job_name)
    body = ""

    for metric,value in metrics.items():
        body = body + "{} {}\n".format(metric, value)

    conn = http.client.HTTPConnection(PUSHGATEWAY_HOST, PUSHGATEWAY_PORT)
    conn.request("PUT", metrics_path, body, {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": len(body)
    })
    response = conn.getresponse()

    print("Send metrics \"{}\", with result: {}".format(body, response.status))

def generate_metric(metric_name):
    result = {}
    result[metric_name] = random.uniform(0.0, 100.0)
    return result

def main():
    while True:
        metrics = generate_metric("randoo_floating")
        send_metrics("randoo", metrics, {})

        time.sleep(5.0)

if __name__ == "__main__":
    main()
